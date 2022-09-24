class NeuralNetwork {
    constructor(neuron_counts) {
        this.levels = [];
        for (let i=0; i<neuron_counts.length-1;i++) {
            this.levels.push(new Level(neuron_counts[i], neuron_counts[i+1]));
        }
    }
    static feed_forward(given_inputs, network) {
        let outputs = Level.feed_forward(given_inputs, network.levels[0]);
        for (let i=1;i<network.levels.length;i++) {
            outputs = Level.feed_forward(outputs, network.levels[i]);
        }
        return outputs;
    }
}

class Level {
    constructor(input_count, output_count) {
        this.inputs = new Array(input_count);
        this.outputs = new Array(output_count);
        this.biases = new Array(output_count);

        this.weights = [];
        for (let i=0; i<input_count; i++) {
            this.weights[i] = new Array(output_count);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i=0;i<level.inputs.length; i++) {
            for (let j=0;j<level.outputs.length;j++) {
                level.weights[i][j] = Math.random() *2 -1;
            }
        }

        for (let i=0;i<level.biases.length; i++) {
            level.biases[i] = Math.random() *2 -1;
        }
    }
    static feed_forward(given_inputs, level) {
        for (let i=0;i<level.inputs.length;i++) {
            level.inputs[i] = given_inputs[i];
        }

        for (let i=0; i<level.outputs.length;i++) {
            let sum=0;
            for (let j=0;j<level.inputs.length;j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}