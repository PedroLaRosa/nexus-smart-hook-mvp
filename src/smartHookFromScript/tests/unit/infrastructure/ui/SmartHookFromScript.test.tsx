import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmartHookFromScript } from '../../../../infrastructure/ui/SmartHookFromScript';
import { GenerateSmartHookFromScriptUseCase } from '../../../../application/GenerateSmartHookFromScriptUseCase';
import { InMemorySmartHookFromScriptGenerationPort } from '../../../../application/ports/SmartHookFromScriptGenerationPort';

describe('The SmartHookFromScript component', () => {
  it('renders the title', () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    render(<SmartHookFromScript useCase={useCase} />);

    expect(screen.getByText('Smart Hook from Script')).toBeInTheDocument();
  });

  it('shows generate button disabled when script is empty', () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    render(<SmartHookFromScript useCase={useCase} />);

    const button = screen.getByRole('button', { name: 'Generate hook' });
    expect(button).toBeDisabled();
  });

  it('displays the generated hook after successful generation', async () => {
    const user = userEvent.setup();
    const hookText = 'Stop scrolling! This will change everything.';
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText(hookText);
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    render(<SmartHookFromScript useCase={useCase} />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Generate hook' });

    await user.type(textarea, 'My full video script text here to generate a hook');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(hookText)).toBeInTheDocument();
    });
  });

  it('displays error message when generation fails', async () => {
    const user = userEvent.setup();
    const port = InMemorySmartHookFromScriptGenerationPort.withError();
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    render(<SmartHookFromScript useCase={useCase} />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Generate hook' });

    await user.type(textarea, 'Some script text to test error handling');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error: Generation failed')).toBeInTheDocument();
    });
  });
});
