async function enhanceVideoAudio(video) {

    if (video.dataset.noiseControlled) return;

    const audioContext = new AudioContext();

    await audioContext.audioWorklet.addModule(
        chrome.runtime.getURL("rnnoise-processor.js")
    );

    const source = audioContext.createMediaElementSource(video);

    const noiseNode = new AudioWorkletNode(
        audioContext,
        "noise-suppressor"
    );

    source
        .connect(noiseNode)
        .connect(audioContext.destination);

    video.dataset.noiseControlled = true;
}

// detect videos dynamically
function scanVideos() {
    document.querySelectorAll("video").forEach(enhanceVideoAudio);
}

setInterval(scanVideos, 2000);
