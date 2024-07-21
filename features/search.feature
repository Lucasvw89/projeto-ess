Feature: Realizar busca de filmes e usuários.
    As a usuário
    I want to buscar filmes por nome ou categoria
    So that eu possa ver reviews de filmes especificos

Scenario: Busca de filme por nome (GUI)
        Given que o usuário está na página inicial
        And os filmes "Os Vingadores" e "Vingadores Ultimato" estão cadastrados no site
        When o usuário seleciona a opção de pesquisa
        And o usuário escreve "Vingadores" e clica no botão "Pesquisar"
        Then os posts dos filmes "Os Vingadores" e "Vingadores Ultimato" são exibidas

Scenario: Busca de filmes por categoria (GUI)
        Given que o usuário está na página inicial 
        And a categoria "Ação" está cadastrada e existem filmes categorizados nessa categoria
        When o usuário seleciona a opção de pesquisa
        And o usuário escreve "Ação" e clica no botão "Pesquisar"
        Then Reviews de filmes de "Ação" são exibidas

Scenario: Busca falhou (GUI)
        Given que o usuário está na página inicial
        And o filme "asdfghjkl" não esta cadastrado no site
        When o usuário seleciona a opção de pesquisa
        And o usuário escreve "asdfghjkl" e clica no botão "Pesquisar"
        Then uma mensagem informando que não foram encontrados resultados é exibida

Scenario: Busca de filme por nome (Serviço)
        Given os filmes "Os Vingadores" e "Os Vingadores Ultimato" estão cadastrados no site
        When o usuário realiza uma requisição por "Vingadores"
        Then os posts dos filmes "Os Vingadores" e "Vingadores Ultimato" são retornados pelo servidor

Scenario: Busca de filmes por categoria (Serviço)
        Given a categoria "Ação" existe e possui filmes categorizados nela
        When o usuário realiza uma requisição por "Ação"
        Then os posts dos filmes categorizados em "Ação" são retornados pelo servidor

Scenario: Busca de filmes por nome falhou (Serviço)
        Given o filme "asdfghjkl" não esta cadastrado no site
        When o usuário realiza uma requisição por "asdfghjkl"
        Then o servidor retorna uma mensagem de erro
        
Scenario: Busca de filmes por categoria falhou (Serviço)
        Given a categoria "asdfghjkl" não existe
        When o usuário realiza uma requisição por "asdfghjkl"
        Then o servidor retorna uma mensagem de erro
