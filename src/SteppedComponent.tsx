function SteppedComponent({ children, activeStep }: any) {
    return children[activeStep]
}

export default SteppedComponent;