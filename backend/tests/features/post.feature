Feature: Post
    As a usuário do site
    I want to criar um review
    So that eu possa compartilhar minha opinião sobre um filme

Scenario: Criar um review.
	Given Execute um get na rota "http://localhost:3000/" armazenando o id do filme "Oppenheimer"
	And Execute um post na rota "http://localhost:3000/posts" com o filme_id no campo filme_id, "1337" no campo user_id, "5" no campo nota e "Filme muito bom" no campo review
    And verifique se o status code é 201 e armazene o post_id
	Then Execute um get na rota "http://localhost:3000/" e verifique se um filme com mesmo post_id existe no filme

Scenario: Falha criação de review sem nota.
    Given Execute um GET na rota "http://localhost:3000/" armazenando o id do filme "Oppenheimer".
    And Execute um POST na rota "http://localhost:3000/posts" com o filme_id no campo filme_id, "1338" no campo user_id e "Filme muito bom" no campo review, deixando o campo nota vazio.
    And Verifique se o status code é 400 e se a mensagem de erro é "Nota is required.".
    Then Verifique se o review com o filme_id não foi criado.

Scenario: Atualizar um review.
    Given Execute um GET na rota "http://localhost:3000/" armazenando o id do filme "Oppenheimer".
    And Execute um POST na rota "http://localhost:3000/posts" com o filme_id no campo filme_id, "1336" no campo user_id, "3" no campo nota e "bom." no campo review e armazene o post_id.
    When Execute um PUT na rota "http://localhost:3000/posts/" com "Obra-prima cinematográfica" no campo review e "5" no campo nota.
    And Verifique se o status code é 200.
    Then Execute um GET na rota "http://localhost:3000/" e verifique se o review atualizado possui o texto "Obra-prima cinematográfica" e a nota "5".

Scenario: Criar um review sem a descrição.
	Given Execute um get na rota "http://localhost:3000/" armazenando o id do filme "Oppenheimer"
	And Execute um post na rota "http://localhost:3000/posts" com o filme_id no campo filme_id, "1339" no campo user_id e "2" no campo nota.
    And verifique se o status code é 201 e armazene o post_id
	Then Execute um get na rota "http://localhost:3000/" e verifique se um filme com mesmo post_id existe no filme

Scenario: Apagar um review
    Given Execute um get na rota "http://localhost:3000/" armazenando o id do filme "Oppenheimer"
    And Execute um post na rota "http://localhost:3000/posts" com o filme_id no campo filme_id, "007" no campo user_id, "2.5" no campo nota e "Mediano" no campo review
    When Executa um DELETE na rota "http://localhost:3000/posts" para apagar o review criado.
    And Verifica se o status da resposta do DELETE é 200 (indicando remoção bem-sucedida).
    Then Executa um GET na rota "http://localhost:3000/" para verificar se o review foi apagado.


