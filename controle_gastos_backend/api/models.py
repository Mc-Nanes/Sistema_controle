from django.db import models
from django.core.exceptions import ValidationError

class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()

    def __str__(self):
        return self.nome

    def clean(self):
        if self.idade < 0:
            raise ValidationError("A idade não pode ser negativa.")

class Transacao(models.Model):
    TIPO_CHOICES = (
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),
    )

    descricao = models.CharField(max_length=255)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=7, choices=TIPO_CHOICES)
    pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='transacoes')

    def clean(self):
        """
        Validação para garantir que menores de idade só possam ter despesas.
        """
        if self.pessoa and self.pessoa.idade < 18 and self.tipo != 'despesa':
            raise ValidationError("Pessoas menores de 18 anos só podem ter transações do tipo despesa.")

    def save(self, *args, **kwargs):
        self.clean()  # Executa a validação antes de salvar
        super().save(*args, **kwargs)
