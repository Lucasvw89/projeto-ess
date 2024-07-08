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


# Scenario: Edição das informações do filme
#     Given Estou na página "Feed" e esejo editar as informações do filme "1984" que está cadastrado no sistema
#     And Ele possui os campos "genero" e "sinopse" com os valores "Comédia" e "Placeholder" respectivamente
#     When Eu clico no componente "Filme" e escolho a opção "Editar"
#     And Modifico as informações do campo "genero" e "sinopse" para "Romance" e "Mil novecentos e oitenta e quatro é um romance distópico do escritor inglês George Orwell. parte para o mundo humano em busca da verdadeira felicidade." respectivamente
#     Then A informação é editada com sucesso e o usuário retorna para a página "Feed"

# Scenario: Cadastro de Filme que já existe
#     Given Estou na página "Feed" e quero adicionar o filme "Barbie2"
#     When Eu pressiono o botão "adicionar mídia"
#     And Preencho as informações "nome", "ano", "duracao", "genero", "sinopse" e "poster" com os dados "Barbie", "2023", "1h54m", "2", "Barbie parte para o mundo humano em busca da verdadeira felicidade." e "https://image.tmdb.org/t/p/original/uUbdc9TMwbazp1zCNzGtXoBHhUa.jpg" respectivamente
#     And O filme "Barbie" já estava cadastrado
#     Then Aparece uma mensagem de erro "O filme já está no sistema"

# Scenario: Cadastro de Filme com informações incompletas
#     Given Estou na página "Feed" e desejo adicionar um filme
#     When Eu pressiono o botão "adicionar mídia"
#     And Preencho apenas as informações "ano", "duracao", "genero", "sinopse" e "poster" com os dados "1968", "2h29", "Science Fiction", "Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world's most advanced super computer." e "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg" respectivamente
#     Then Aparece uma mensagem de erro "Cadastro Incompleto" e o usuário permanece na página "Feed"
