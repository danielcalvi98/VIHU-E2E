

describe("📝 TODO app", () => {
  // TODO Add your Cypress tests here
  before(() => {
    cy.exec('npm run prisma:reset')
  })

  after(() => {
    cy.exec('npm run prisma:reset')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')  
  })

  describe("TODO list is empty", () => {
    it("should validate if the TODO list is empty", () => {
      cy.get('[data-testid=todo-item]').should('have.length', 0)      
    })
  })

  
  describe("Add to TODO list", () => {
    it('should add a new item to TODO list', () => {
      const newTodo = 'Finish E2E project 😎'
      cy.get('[data-testid=todo-input]').type(`${newTodo}{enter}`);
      cy.get('[data-testid=todo-item]').should('have.length',1)
    })
  })
  
  describe("Add another", () => {
    it('should add another item to TODO list', () => {
      const newTodo = 'Have a cold refreshing beverage 🍹'
      cy.get('[data-testid=todo-input]').type(`${newTodo}{enter}`);
      cy.get('[data-testid=todo-item]').should('have.length', 2)
    })
  })

  describe("Remove from TODO list", () => {
    it('should remove one item from the TODO list', () => {
      cy.get('[data-testid=todo-item]').first().click()
      cy.get('[data-testid=todo-item]').should('have.length',1)
    })
  })
});
