from rest_framework.routers import DefaultRouter
from .views import PessoaViewSet, TransacaoListCreateView, TotaisView
from django.urls import path

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet, basename='pessoa')

urlpatterns = [
    path('transacoes/', TransacaoListCreateView.as_view(),
         name='lista-cria-transacoes'),
    path('totais/', TotaisView.as_view(), name='consulta-totais'),
]

# Inclua as URLs geradas pelo router
urlpatterns += router.urls
