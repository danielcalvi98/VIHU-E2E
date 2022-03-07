import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import "@testing-library/jest-dom";
import Home from "../pages/index";
// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here
const server = setupServer(
  rest.get('/api/list', (req, res, ctx) => {
    return res(ctx.status(200),ctx.json([{id: "1", title: "TODO"}]))
  }),
  rest.post('/api/add', (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.delete('/api/remove', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("📝Tests", () => {
  // TODO Add your react-testing-library tests here
  test("🚚 Displays loading", async () => {
    
    server.use(
      rest.get('/api/list', (req, res, ctx) => {
        return res(ctx.json(null))
      }),
    )
    render(<Home />)
    await waitFor(() => 
      expect(screen.getByTestId("loading")).toBeInTheDocument()
    );  
  })

  test("🔍 Check if 1 item is in the list", async () => {
    render(<Home />)
    await waitFor(() =>
        expect(screen.getAllByTestId("todo-item")).toHaveLength(1)
    );
  })

  test("➕ Add TODO to the list", async () => {
    render(<Home />);
    await waitFor(() =>
        expect(screen.getAllByTestId("todo-item")).toHaveLength(1)
    );
    fireEvent.change(screen.getByTestId("todo-input"), {
        target: { value: "TODO" },
    });
    fireEvent.submit(screen.getByTestId("todo-input"));
    await waitFor(() =>
        expect(screen.getAllByTestId("todo-item")).toHaveLength(2)
    );
});
// Write a test that removes an item from the list
test("➖  Remove TODO from the list", async () => {
    render(<Home />);
    await waitFor(() =>
        expect(screen.getAllByTestId("todo-item")).toHaveLength(1)
    );
    fireEvent.click(screen.getByTestId("todo-item"));
    await waitFor(() =>
        expect(screen.queryAllByTestId("todo-item")).toHaveLength(0)
    );
  });
});
