
export interface TicTacToeService {
  setDefaultBoardValue: (value: string) => void
  getDefaultBoardValue: () => string
  checkBoardValues: (boardValues: Array<string>, pos0: number, pos1: number, pos2: number) => boolean
  checkBoardForWin: (boardValues: Array<string>) => boolean
  positionIsAvailable: (boardValues: Array<string>, position: number) => boolean
}

export default class GameService implements TicTacToeService {
  private _defaultBoardValue: string

  constructor(defaultBoardValue: string) {
    this._defaultBoardValue = defaultBoardValue
  }

  public getDefaultBoardValue() : string {
    return this._defaultBoardValue
  }

  public setDefaultBoardValue(value: string) {
    this._defaultBoardValue = value
  }

  public checkBoardValues(boardValues: Array<string>, pos0: number, pos1: number, pos2: number): boolean {

      // If the board values use the defaultValue a win isn't possible
      if (boardValues[pos0] === this._defaultBoardValue || boardValues[pos1] === this._defaultBoardValue || boardValues[pos1] === this._defaultBoardValue) {
          return false
      }

      return (boardValues[pos0] === boardValues[pos1]) && (boardValues[pos1] === boardValues[pos2])
  }

  public checkBoardForWin = (boardValues: Array<string>): boolean => {
      const TL = 0
      const TM = 1
      const TR = 2
      const ML = 3
      const MM = 4
      const MR = 5
      const BL = 6
      const BM = 7
      const BR = 8

      return this.checkBoardValues(boardValues, TL, TM, TR) ||
          this.checkBoardValues(boardValues, ML, MM, MR) ||
          this.checkBoardValues(boardValues, BL, BM, BR) ||

          // Horizontal Checks
          this.checkBoardValues(boardValues, TL, ML, BL) ||
          this.checkBoardValues(boardValues, TM, MM, BM) ||
          this.checkBoardValues(boardValues, TR, MR, BR) ||

          // Diagonal Checks
          this.checkBoardValues(boardValues, TL, MM, BR) ||
          this.checkBoardValues(boardValues, TR, MM, BL)
  }

  public positionIsAvailable = (boardValues: Array<string>, position: number): boolean => boardValues[position] === this._defaultBoardValue
}