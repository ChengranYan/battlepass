


namespace GameHolder {
    export const controller = new GameController();

    export const propsList = [
            [1,2],
            [3,3],
            [3, 1],
            [2, 3],
        ];
    export const propImageByDrawingIdAndIndex = function(drawingId: number, index: number) {
        console.log(drawingId, index);
        return propImageById(propsByDrawingId(drawingId)[index]);
    }
    export const propsByDrawingId = function(drawingId: number) {
        return propsList[drawingId-1];
    }
    export const propImageById = function(propId: number) {
        console.log(propId);
        switch(propId) {
            case 0:
                return RES.getRes("prop_unknown_png");
            case 1:
                return RES.getRes("prop_practice_png");
            case 2:
                return RES.getRes("prop_time_png");
            case 3:
                return RES.getRes("prop_ink_png");
        }
    }
}