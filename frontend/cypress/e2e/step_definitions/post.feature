Feature: Post
    As a usuário do site
    I want to criar um review
    So that eu possa compartilhar minha opinião sobre um filme

Scenario: Criar um review.
	Given Eu Estou na página do filme "Teste"
	When Eu clico no botão "Poste um Review"
	Then Um "Modal de Review" abre na minha tela
	And Eu preencho "Filme muito bom" no campo "Review", "5" no campo nota e clico em "ENVIAR"
	And O "Modal de Review" fecha
	Then Eu posso ver meu review no "Forum"

Scenario: Criação de um review sem a descricao.
	Given Eu Estou na página do filme "Teste"
	When Eu clico no botão "Poste um Review"
	And Um "Modal de Review" abre na minha tela
    And Eu preencho "5" no campo nota e clico no botão "ENVIAR"
	And O "Modal de Review" fecha
	Then Eu posso ver meu review no "Forum"

# Scenario: Falha criação de review sem nota.
# 	Given Eu Estou na página do filme "Oppenheimer"
# 	When Eu clico no botão "Review"
# 	And Um "Modal de Review" abre na minha tela
#     And eu preencho "Filme muito bom" no campo "Review" e clico no botão "Publicar"
# 	Then Uma "Mensagem de Erro" escrita "Erro: O campo Nota é de preenchimento obrigatório" surge ao lado do botão "Publicar"
# 	And Um asterisco vermelho surge ao lado do campo "Nota"

# Scenario: Falha na criação de um post não clicou no botão de submeter
# 	Given Eu Estou na página do filme "Oppenheimer"
# 	When Eu clico no botão "Review"
# 	And Um "Modal de Review" abre na minha tela
# 	And Eu preencho "Filme muito bom" no campo "Review", "5" no campo nota e clico no "X" para fechar
# 	Then O "Modal de Review" fecha
# 	And Não existe um review feito por mim no topo do "Campo de Reviews"

# Scenario: Falha na criação de um post clicou no botão de submeter sem preencher os campos
#     Given Eu Estou na página do filme "Barbie"
#     When Eu clico no botão "Review"
#     And Um "Modal de Review" abre na minha tela
#     And Eu clico no botão "Publicar"
#     Then Uma "Mensagem de Erro" escrita "Erro: O campo Nota é de preenchimento obrigatório" surge ao lado do botão "Publicar"
#     And Um asterisco vermelho surge ao lado do campo "Nota"

# Scenario: Apagar um review.
#     Given Eu estou na página do filme "Oppenheimer"
#     And Eu já publiquei um review com o texto "Filme muito bom" e nota "5"
#     When Eu clico no botão "Apagar" no meu review
#     Then Meu review é removido do "Campo de Reviews"
#     And Eu não posso mais ver meu review no "Campo de Reviews"

# Scenario: Atualizar um review.
#     Given Eu estou na página do filme "Oppenheimer"
#     And Eu já publiquei um review com o texto "bom." e nota "3"
#     When Eu clico no botão "Editar" no meu review
#     And Um "Modal de Edição de Review" abre na minha tela
#     And Eu altero o texto para "Obra-prima cinematográfica" e a nota para "5" e clico em "Atualizar"
#     Then O "Modal de Edição de Review" fecha
#     And Eu posso ver meu review atualizado com o texto "Obra-prima cinematográfica" e nota "5" no topo do "Campo de Reviews"