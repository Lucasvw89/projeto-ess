Feature: Content
    As a: administrador do site  
    I want to gerenciar a mídia do site 
    So that os usuários possam compartilhar reviews


Scenario: Cadastro de Filme com sucesso
    Given o banco de dados requer os dados obrigatórios nome, gênero, ano, diretor, duracao, sinopse e poster para o cadastro.
    When o administrador envia uma requisição POST para a rota /movie com os dados "The Lighthouse", "Horror", "2019", "Robert Eggers", "1h49m", "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s." e "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg" respectivamente
    Then o sistema retorna o status code 201 e a resposta deve conter a mensagem "Filme Adicionado com Sucesso"

Scenario: Remoção de Filme com Sucesso
    Given o banco de dados requer o ID do filme para a remoção.
    And o filme "Enrolados" está cadastrado no banco de dados com o ID "a7b8c9d0-1e2f-11ef-3a4b-5c6d7e8f9a0b"
    When o administrador envia uma requisição DELETE para a rota /movie passando o ID "a7b8c9d0-1e2f-11ef-3a4b-5c6d7e8f9a0b"
    Then o sistema retorna o status code 200 e a resposta deve conter a mensagem "Filme Removido com Sucesso"
    And o filme "Enrolados" não está mais disponível no banco de dados

Scenario: Edição das Informações do Filme com sucesso

    Given o banco de dados requer um ou mais dos seguintes dados para a edição: filme_id, nome, ano, duracao, genero, sinopse, poster, plataformas.
    And o filme "1984" de ID "40028922" está cadastrado no sistema e possui seus campos sinopse e genero como "Placeholder" e "Comédia" respectivamente.
    When o administrador envia uma requisição PUT para a rota /movie passando o ID "40028922" com os campos sinopse e gênero sendo "1984 is the story of a man questioning the system that keeeps his society afloat" e "Ficcção Científica".
    Then o sistema retorna o status code 200 e a mensagem "Filme Editado com Sucesso"
    And Os campos sinopse e genero agora são "1984 is the story of a man questioning the system that keeeps his society afloat" e "Ficcção Científica".

Scenario: Cadastro de Filme que já existe
    Given o banco de dados requer os dados obrigatórios nome, gênero, ano, diretor, duracao, sinopse e poster para o cadastro.
    When o administrador envia uma requisição POST para a rota /movie com os dados "The Lighthouse", "Horror", "2019", "Robert Eggers", "1h49m", "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s." e "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg" respectivamente
    Then O sistema retorna o status code 409 e a mensagem de erro "Filme já cadastrado no sistema".

# Scenario: Cadastro de Filme com informações incompletas
#     Given Estou na página "Feed" e desejo adicionar um filme
#     When Eu pressiono o botão "adicionar mídia"
#     And Preencho apenas as informações "ano", "duracao", "genero", "sinopse" e "poster" com os dados "1968", "2h29", "Science Fiction", "Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world's most advanced super computer." e "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg" respectivamente
#     Then Aparece uma mensagem de erro "Cadastro Incompleto" e o usuário permanece na página "Feed"
