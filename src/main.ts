import shader from "./shaders/shaders.wgsl"

async function init() {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("gfx-main");

    const adapter: GPUAdapter = await navigator.gpu.requestAdapter();
    const device: GPUDevice = await adapter.requestDevice();
    const context: GPUCanvasContext = canvas.getContext("webgpu");
    const format: GPUTextureFormat = "bgra8unorm";
    context.configure({
        device,
        format
    });

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [],
    });

    const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: []
    });

    const pipeline: GPURenderPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main"
        },
        fragment: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [
                {
                    format
                }
            ]
        },
        primitive: {
            topology: "triangle-list"
        }
    });

    const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();
    const textureView: GPUTextureView = context.getCurrentTexture().createView();

    const colorAttachment: GPURenderPassColorAttachment = {
        loadOp: "clear",
        storeOp: "store",
        view: textureView,
        clearValue: { r: 0.4, g: 0.0, b: 0.25, a: 1.0 }
    }

    const renderpass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [colorAttachment]
    });

    renderpass.setPipeline(pipeline);
    renderpass.setBindGroup(0, bindGroup)
    renderpass.draw(3, 1, 0, 0);
    renderpass.end();

    device.queue.submit([commandEncoder.finish()]);
}

init();