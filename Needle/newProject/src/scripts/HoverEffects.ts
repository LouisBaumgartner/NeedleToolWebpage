import { Renderer, Behaviour, IPointerEventHandler, PointerEventData, serializable, Animation, IPointerClickHandler, AssetReference, AudioSource, Animator, MeshRenderer, SkinnedMeshRenderer } from "@needle-tools/engine";
import { Audio, Color, Material, MeshStandardMaterial } from "three";

export class HoverEffects extends Behaviour implements IPointerEventHandler, IPointerClickHandler {

    @serializable(AudioSource)
    onClickAudio?: AudioSource

    @serializable(AudioSource)
    onHoverEnterAudio?: AudioSource;

    @serializable(AudioSource)
    onHoverExitAudio?: AudioSource;

    @serializable(Animator)
    animator?: Animator = undefined;

    @serializable(Renderer)
    private renderer: Renderer | null = null;

    private isClickInProgress: boolean = false;

    start(): void {

    }

    onPointerEnter(args: PointerEventData) {
        if (this.isClickInProgress) return;

        console.log("hover enter");
        this.onHoverEnterAudio?.play();
        this.animator?.setBool("Hover", true);
        this.context.input.setCursorPointer();

        const renderer = this.gameObject.getComponent(MeshRenderer) || this.gameObject.getComponent(SkinnedMeshRenderer);
        if (renderer && renderer.sharedMaterial && renderer.sharedMaterial instanceof MeshStandardMaterial) {
            renderer.sharedMaterial.emissiveIntensity = 2.0;
        }
    }

    onPointerExit(args: PointerEventData) {
        if (this.isClickInProgress) {
            return;
        }
        console.log("hover exit");
        this.onHoverExitAudio?.play();
        this.animator?.setBool("Hover", false);
        this.context.input.setCursorNormal();

        const renderer = this.gameObject.getComponent(MeshRenderer) || this.gameObject.getComponent(SkinnedMeshRenderer);
        if (renderer && renderer.sharedMaterial && renderer.sharedMaterial instanceof MeshStandardMaterial) {
            renderer.sharedMaterial.emissiveIntensity = 0.0;
        }
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

