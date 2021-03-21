import WebMidi, { Input, Output, INoteParam } from 'webmidi'

const noop = () => { }

export const isWebMidi = () => {
    return navigator["requestMIDIAccess"]
}

// TODO: Fix this so that it returns a bollean
export const enableWebMidi = async () => {
    if (WebMidi.enabled) { return }
    return WebMidi.enable()
    // WebMidi.enable(function (err) {
    //     if (err) {
    //         console.log('Not supported error: ', err)
    //     } else {
    //         console.log('WebMidi enabled')
    //     }

    // });
}

export const getInputs = () => {
    // Viewing available inputs and outputs
    const inputs: Input[] = WebMidi.inputs
    return inputs;
}

export const getOutputs = () => {
    const outputs: Output[] = WebMidi.outputs
    return outputs

}


// TODO: Fix async behaviour 
export const playNote = async (port: number, note: INoteParam) => {
    enableWebMidi().then(x => {
        console.log('playNote')
        WebMidi.outputs[port].playNote(note, 'all', { duration: 4000, velocity: 1 });
    })
}

export const sendCc = (port: number, controller: number, value:number ) => {
    enableWebMidi().then(x => {
        console.log('sendCc')
        WebMidi.outputs[port].sendControlChange(controller, value, 'all');
    })  
}

export const incParam = (port, param, channel) => {
    WebMidi.outputs[port].incrementRegisteredParameter(param, channel) 
}

export const decParam = (port, param, channel) => {
   WebMidi.outputs[port].decrementRegisteredParameter(param, channel) 
}