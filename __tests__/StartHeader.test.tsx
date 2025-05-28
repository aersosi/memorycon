import { render, screen } from '@testing-library/react';
import StartHeader from '@/components/startPage/startHeader';
import '@testing-library/jest-dom'

describe('StartHeader', () => {
    it('rendert den Willkommenstext und Titel korrekt', () => {
        render(<StartHeader />);
        expect(screen.getByText('Wilkommen zu')).toBeInTheDocument();
        expect(screen.getByText('memorycon')).toBeInTheDocument();
    });
});