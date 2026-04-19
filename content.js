async function enhanceVideoAudio(video) {
    if (video.dataset.noiseControlled) return;

    const audioContext = new AudioContext();

    const source = audioContext.createMediaElementSource(video);

    // simple noise reduction filter
    const filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 120;

    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -40;
    compressor.knee.value = 20;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    source
        .connect(filter)
        .connect(compressor)
        .connect(audioContext.destination);

    video.dataset.noiseControlled = true;
}

// detect videos dynamically
function scanVideos() {
    document.querySelectorAll("video").forEach(enhanceVideoAudio);
}

setInterval(scanVideos, 2000);
