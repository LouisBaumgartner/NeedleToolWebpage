import {Behaviour, IPointerEventHandler, PointerEventData, serializable, Animation, IPointerClickHandler} from "@needle-tools/engine";

export class HoverEffects extends Behaviour implements IPointerEventHandler, IPointerClickHandler{
    @serializable(Animation)
    animation?: Animation;

    awake(): void {
        if(this.animation){
            this.animation.playAutomatically = false;
            this.animation.loop = false;
            this.animation.loop = false;
        }
    }
    onPointerEnter(args: PointerEventData) {
        this.animation?.play;
    }

    onPointerExit(args: PointerEventData) {
        
    }

    onPointerClick(args: PointerEventData) {
        console.log("click")
    }

}