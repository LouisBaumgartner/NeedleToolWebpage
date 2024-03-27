import {Behaviour, IPointerEventHandler, PointerEventData, serializable, Animation, IPointerClickHandler, AssetReference, AudioSource, Animator} from "@needle-tools/engine";
import { Audio } from "three";

export class HoverEffects extends Behaviour implements IPointerEventHandler, IPointerClickHandler{
    
    @serializable(AudioSource)
    onClickAudio?: AudioSource

    @serializable(AudioSource)
    onHoverEnterAudio?: AudioSource;

    @serializable(AudioSource)
    onHoverExitAudio?: AudioSource;

    @serializable(Animator)
    animator?: Animator = undefined;

    private isClickInProgress: boolean = false;

    onPointerEnter(args: PointerEventData) {
        if(this.isClickInProgress){
            return;
        }

        console.log("hover enter");
        this.onHoverEnterAudio?.play();
        this.animator?.setBool("Hover", true);
    }

    onPointerExit(args: PointerEventData) {
        if(this.isClickInProgress){
            return;
        }
        console.log("hover exit");
        this.onHoverExitAudio?.play();
        this.animator?.setBool("Hover", false);
    }

    onPointerClick(args: PointerEventData) {
        console.log("click");
        this.onClickAudio?.play();
        this.animator?.setTrigger("Click");
        this.isClickInProgress = false;
    }

    onPointerDown(args: PointerEventData) {
        this.isClickInProgress = true;
    }

    onPointerUp(args: PointerEventData) {
        this.isClickInProgress = false;
    }
}