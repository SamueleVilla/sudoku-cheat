export const BOARD_SIZE = 9;

export const validCellValue = (value: number) => value >= 1 && value <= 9;

export const generateBoard = (): number[][] => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => 0),
  );
};
