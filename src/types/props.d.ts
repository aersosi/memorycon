export type CountdownProps = {
    initialTime: number;
    onTimeOver?: () => void;
};

export type CardSideProps = {
    className?: string;
    children?: React.ReactNode;
};

export type CardProps = {
    emoji: string,
    isFlipped: boolean,
    isFound: boolean,
    isPreview: boolean,
    onFlip: () => void,
};

export type GameEndDialogProps = {
    isOpen?: boolean,
    onButton?: () => void
}