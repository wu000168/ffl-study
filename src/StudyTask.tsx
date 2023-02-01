function StudyTask({ completed, survey, children }: any) {
    return completed ? survey : children;
}

export default StudyTask;