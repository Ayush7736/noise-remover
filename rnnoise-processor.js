class NoiseSuppressorProcessor extends AudioWorkletProcessor {

    constructor() {
        super();

        // simple adaptive noise gate parameters
        this.threshold = 0.02;
        this.reduction = 0.15;
    }

    process(inputs, outputs) {

        const input = inputs[0];
        const output = outputs[0];

        if (!input.length) return true;

        for (let channel = 0; channel < input.length; channel++) {

            const inputChannel = input[channel];
            const outputChannel = output[channel];

            for (let i = 0; i < inputChannel.length; i++) {

                let sample = inputChannel[i];

                // suppress low level noise
                if (Math.abs(sample) < this.threshold) {
                    sample *= this.reduction;
                }

                outputChannel[i] = sample;
            }
        }

        return true;
    }
}

registerProcessor("noise-suppressor", NoiseSuppressorProcessor);
