
class GameHolder {

    private static gameController: GameController;

    public static start() {
        if (this.gameController) {
            throw "Game is already started";
        }
        this.gameController = new GameController();
    }

    public static controller() {
        return this.gameController;
    }

}