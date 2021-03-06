import { Grid, Grids, Piece } from '../../';

const insertInGrid = <T>(
  grid: Grid<T>,
  item: Grid<T>,
  location: number[]
): Grid<T> => {
  const [centreY, centreX] = location;
  const deviation = Math.floor(item.length / 2);

  return grid.map((row, gridY) => {
    if (gridY < centreY - deviation || gridY > centreY + deviation) {
      return row;
    }
    const pieceY = gridY - centreY + deviation;
    return row.map((block, gridX) => {
      if (block || gridX < centreX - deviation || gridX > centreX + deviation) {
        return block;
      }
      const pieceX = gridX - centreX + deviation;
      return item[pieceY][pieceX] === null ? block : item[pieceY][pieceX];
    });
  });
};

export const insertPiece = (grids: Grids, ...pieces: Piece[]): Grids => {
   return pieces.reduce((grids, piece) => {
    const { StructureGrid, PieceGrid, BorderGrid } = grids;
    const { structure, borders, location } = piece;

    if (location.length === 0) {
      return grids;
    }

    return {
      StructureGrid: insertInGrid(StructureGrid, structure, location),
      PieceGrid: insertInGrid(PieceGrid, [[piece]], location),
      BorderGrid: insertInGrid(BorderGrid, borders, location),
    };
  }, grids);
};
