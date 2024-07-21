Feature: Realizar busca de filmes e usuários.
    As a usuário
    I want to buscar filmes por nome ou categoria
    So that eu possa ver reviews de filmes especificos

Scenario: Busca de filme por nome
        Given os filmes "Os Vingadores" e "Os Vingadores Ultimato" estão cadastrados no site
        When o usuário realiza uma requisição por "Vingadores"
        Then os posts dos filmes "Os Vingadores" e "Vingadores Ultimato" são retornados pelo servidor

Scenario: Busca de filmes por categoria
        Given a categoria "Ação" existe e possui filmes categorizados nela
        When o usuário realiza uma requisição por "Ação"
        Then os posts dos filmes categorizados em "Ação" são retornados pelo servidor

Scenario: Busca de filmes por nome falhou
        Given o filme "asdfghjkl" não esta cadastrado no site
        When o usuário realiza uma requisição por "asdfghjkl"
        Then o servidor retorna uma mensagem de erro

Scenario: Busca de filmes por categoria falhou
        Given a categoria "asdfghjkl" não existe
        When o usuário realiza uma requisição por "asdfghjkl"
        Then o servidor retorna uma mensagem de erro
