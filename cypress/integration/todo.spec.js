

describe("📝 TODO app", () => {
  // TODO Add your Cypress tests here
  beforeEach(() => {
    cy.visit('http://localhost:3000')  
  })

  after(() => {
    cy.get('[data-testid=todo-item]').click({multiple:true})
  })

  it("should validate if the TODO list is empty", () => {
    cy.get('[data-testid=todo-item]').should('have.length', 0)
    
  })

  it('should add a new item to TODO list', () => {
    const newTodo = 'Finish E2E project 😎'
    cy.get('[data-testid=todo-input]').type(`${newTodo}{enter}`);
    cy.get('[data-testid=todo-item]').should('have.length',1)
  })
  

  it('should add another item to TODO list', () => {
    const newTodo = 'Have a cold refreshing beverage 🍹'
    cy.get('[data-testid=todo-input]').type(`${newTodo}{enter}`);
    cy.get('[data-testid=todo-item]').should('have.length', 2)
  })

  it('should remove one item from the TODO list', () => {
    cy.get('[data-testid=todo-item]').first().click()
    cy.get('[data-testid=todo-item]').should('have.length',1)
  })
});
