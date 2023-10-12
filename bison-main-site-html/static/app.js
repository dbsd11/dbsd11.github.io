var canvasElement = document.getElementById('canvas');
import { Engine3D, Scene3D, Object3D, Camera3D, View3D, UIImage, HoverCameraController, AtmosphericComponent, BitmapTexture2D, makeAloneSprite, WorldPanel, GPUCullMode } from '@orillusion/core';
class Sample_Image {
    async run() {
        // initializa engine
        await Engine3D.init({
            canvasConfig: { canvas: canvasElement }
        });
        // create new scene as root node
        let scene3D = new Scene3D();
        scene3D.addComponent(AtmosphericComponent);
        // create camera
        let cameraObj = new Object3D();
        let camera = cameraObj.addComponent(Camera3D);
        // adjust camera view
        camera.perspective(60, Engine3D.aspect, 1, 5000.0);
        // set camera controller
        let controller = cameraObj.addComponent(HoverCameraController);
        controller.setCamera(0, -20, 100);
        // add camera node
        scene3D.addChild(cameraObj);
        let view = new View3D();
        view.scene = scene3D;
        view.camera = camera;
        Engine3D.startRenderView(view);
        // create panel root
        let panelRoot = new Object3D();
        let panel = panelRoot.addComponent(WorldPanel);
        panel.cullMode = GPUCullMode.none;
        panelRoot.localScale.set(0.1, 0.1, 0.1);
        let canvas = view.enableUICanvas();
        canvas.addChild(panelRoot);
        // load a BitmapTexture2D
        let bitmapTexture2D = new BitmapTexture2D();
        bitmapTexture2D.flipY = true;
        await bitmapTexture2D.load('https://cdn.orillusion.com/images/webgpu.png');
        // create image node
        let imageQuad = new Object3D();
        panelRoot.addChild(imageQuad);
        // create image component
        let image = imageQuad.addComponent(UIImage);
        // set image size
        image.uiTransform.resize(50, 50);
        // set image source
        image.sprite = makeAloneSprite('webgpu', bitmapTexture2D);
    }
}
new Sample_Image().run();
