from rest_framework import serializers
from .models import Pessoa, Transacao

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id', 'nome', 'idade']

    def validate_idade(self, value):
        """
        Garante que a idade não seja negativa.
        """
        if value < 0:
            raise serializers.ValidationError("A idade não pode ser negativa.")
        return value

class TransacaoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transacao
        fields = ['id', 'descricao', 'valor', 'tipo', 'pessoa']

    def validate_valor(self, value):
        if value <= 0:
            raise serializers.ValidationError("O valor deve ser um número positivo.")
        return value

    def validate(self, data):
        pessoa = data.get('pessoa')
        if pessoa and pessoa.idade < 18 and data.get('tipo') != 'despesa':
            raise serializers.ValidationError("Pessoas menores de 18 anos só podem ter transações do tipo despesa.")
        return data

