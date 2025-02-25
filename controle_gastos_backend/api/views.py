from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Case, When, Value, DecimalField
from .models import Pessoa, Transacao
from .serializers import PessoaSerializer, TransacaoSerializer

# CRUD para Pessoas
class PessoaViewSet(viewsets.ModelViewSet):
    """
    ViewSet que permite:
    - Listar todas as pessoas (GET /pessoas/)
    - Criar uma nova pessoa (POST /pessoas/)
    - Deletar uma pessoa (DELETE /pessoas/{id}/)
    
    Ao deletar uma pessoa, todas as transações associadas serão removidas
    devido ao on_delete=models.CASCADE definido no modelo.
    """
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

# Cadastro e listagem de Transações
class TransacaoListCreateView(generics.ListCreateAPIView):
    queryset = Transacao.objects.all()
    serializer_class = TransacaoSerializer

# Consulta de Totais
class TotaisView(APIView):
    def get(self, request):
        # Anotando os totais de receitas e despesas diretamente no queryset
        pessoas = Pessoa.objects.annotate(
            total_receitas=Sum(
                Case(
                    When(transacoes__tipo='receita', then='transacoes__valor'),
                    default=Value(0),
                    output_field=DecimalField()
                )
            ),
            total_despesas=Sum(
                Case(
                    When(transacoes__tipo='despesa', then='transacoes__valor'),
                    default=Value(0),
                    output_field=DecimalField()
                )
            )
        )

        # Lista para armazenar os totais por pessoa
        pessoas_totais = []
        for pessoa in pessoas:
            saldo = (pessoa.total_receitas or 0) - (pessoa.total_despesas or 0)

            pessoas_totais.append({
                'id': pessoa.id,
                'nome': pessoa.nome,
                'idade': pessoa.idade,
                'total_receitas': float(pessoa.total_receitas or 0),
                'total_despesas': float(pessoa.total_despesas or 0),
                'saldo': float(saldo)
            })

        # Totais gerais em uma única query
        geral_totais = Transacao.objects.aggregate(
            geral_receitas=Sum(Case(
                When(tipo='receita', then='valor'),
                default=Value(0),
                output_field=DecimalField()
            )),
            geral_despesas=Sum(Case(
                When(tipo='despesa', then='valor'),
                default=Value(0),
                output_field=DecimalField()
            ))
        )

        geral_receitas = geral_totais['geral_receitas'] or 0
        geral_despesas = geral_totais['geral_despesas'] or 0
        geral_saldo = geral_receitas - geral_despesas

        # Estrutura final do JSON de resposta
        dados = {
            'pessoas': pessoas_totais,
            'totais_gerais': {
                'total_receitas': float(geral_receitas),
                'total_despesas': float(geral_despesas),
                'saldo_liquido': float(geral_saldo)
            }
        }

        return Response(dados, status=status.HTTP_200_OK)


