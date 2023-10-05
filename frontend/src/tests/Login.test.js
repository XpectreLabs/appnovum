import { render, screen } from '@testing-library/react';
import {Login2} from '../components/Login/Login2.tsx';
import '@testing-library/jest-dom'

describe('Login', () => {
  test("Validar boton", () => {
    render(<Login2 />)
    const buttonElement = screen.getByText(/Prueba/i);
    expect(buttonElement).toBeInTheDocument();
  });
});