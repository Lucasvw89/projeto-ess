Feature: Maintenance
    As a moderador do site
    I want to editar uma review
    So that eu possa editar uma  review que já existe

Scenario: Salvar edição de review
  Given Estou no post "Oppenheimer" que já existe no sistema
  And Existe uma review do usuario "1" com texto "Horrivel!"
  And selecionei a opção "Editar"
  When Eu editar a review para que ela fique "Horrivel"
  And Selecionar a opção "Salvar"
  Then Serei redirecionado a "página inicial"
  And A review do usuario "1" no post "Oppenheimer" terá a review "Horrivel"

Scenario: Remover review
  Given Estou no post "Oppenheimer" que já existe no sistema
  And Existe uma review do usuario "1" com texto "Horrivel"
  When Eu selecionar a opção "Remover" a review do usuario "1"
  Then A review do usuario "1" no post "Oppenheimer" estará em branco " "

Scenario: Falha na edição
  Given Estou no post "Oppenheimer" que já existe no sistema
  And Existe uma review do usuario "1" com texto "Horrivel!"
  And selecionei a opção "Editar"
  When Eu editar a review para que ela fique "Horrivel"
  And Selecionar a opção "Sair da página"
  Then Serei redirecionado a "página inicial"
  And A review do usuario "1" no post "Oppenheimer" terá a review "Horrivel!"

# Scenario: Entrar na edição review
#   Given Estou no post "Eduardo e Monica" que já existe no sistema
#   And Existe uma review do usuario "1" no post
#   When Eu selecionar a opção "Editar"
#   Then Irei ter acesso a edição da review do usuario "1"
#   And Terá as opções "Salvar edição" e "Cancelar"
