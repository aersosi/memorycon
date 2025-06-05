import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGameDispatch, useGameState } from "@/contexts/gameContext";
import { useState, KeyboardEvent, useCallback, ChangeEvent, useRef } from "react";

export default function StartInput() {
    const dispatch = useGameDispatch();
    const {humanName} = useGameState();

    const [inputValue, setInputValue] = useState(humanName || "");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === "Tab") {
                const nameValue = inputValue.trim() ? inputValue.trim() : "";
                dispatch({type: "SET_HUMAN_NAME", payload: nameValue});
            } else if (e.key === "Escape") {
                setInputValue("Human");
                inputRef.current?.blur();
            }
        }, [inputValue, dispatch]
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            dispatch({type: "SET_HUMAN_NAME", payload: newValue.trim()});
        }, [dispatch]
    );

    return (
        <>
            <Label htmlFor="Ihr Name">
                <span className="text-lg">Ihr Name</span>
            </Label>
            <Input type="text"
                   id="humanName"
                   ref={inputRef}
                   value={inputValue}
                   onKeyDown={handleKeyDown}
                   onChange={handleChange}
                   placeholder="Ihr Name"
            />
            <p className="text-accent text-sm">Sie können dieses Feld auch frei lassen</p>
        </>
    );
}