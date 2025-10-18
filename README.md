# ASL Live Subtitles

## 🎯 Project Vision

**ASL Live Subtitles** is an innovative accessibility tool designed to bridge the communication gap for the American Sign Language (ASL) community by providing real-time subtitle generation from hand gesture recognition. This microservice serves as the core ML inference engine that powers live ASL-to-text translation, making conversations, presentations, and media content more accessible to deaf and hard-of-hearing individuals.

## 🚀 Development Roadmap

Our development follows a progressive approach to ensure accuracy and usability at each stage:

### Phase 1: Letter-Level Recognition (Current)

We begin with precise recognition of individual ASL letters (A-Z) and numbers (0-9). This foundational phase establishes the core hand gesture detection pipeline using MediaPipe for landmark extraction and TensorFlow Lite models for classification. Each hand gesture is processed in real-time, providing immediate feedback with confidence scores to ensure reliable letter-by-letter recognition.

### Phase 2: Word-Level Assembly (Next)

Building upon letter recognition, we will implement intelligent word formation algorithms that combine individual letters into meaningful words. This phase includes:

- **Temporal sequence analysis** to group letters into word boundaries
- **Dictionary validation** to ensure recognized letter sequences form valid words
- **Context-aware corrections** to handle common recognition errors
- **Real-time word completion** suggestions to improve user experience

### Phase 3: Sentence Generation with AI (Future)

The final phase leverages the power of Large Language Models (LLMs) like GPT to transform recognized words into coherent, contextually appropriate sentences:

- **Natural Language Processing** integration to construct grammatically correct sentences
- **Context preservation** across conversation threads
- **Intelligent punctuation** and sentence structure optimization
- **Multi-speaker conversation handling** for group discussions

### Phase 4: Sentiment Analysis Integration

To provide richer communication context, we integrate sentiment analysis capabilities:

- **Real-time emotion detection** from gesture patterns and facial expressions
- **Sentiment scoring** for each generated sentence (positive, negative, neutral)
- **Emotional context visualization** through color-coded subtitles or emoji indicators
- **Conversation mood tracking** to help participants understand the emotional flow of discussions

## 🛠 Technical Architecture

This microservice provides a robust REST API for:

- **Gesture Recognition**: Process hand landmarks and return predicted letters/gestures
- **Model Management**: Register, update, and manage multiple ML models
- **Batch Processing**: Handle multiple predictions for improved efficiency
- **Real-time Inference**: Low-latency prediction suitable for live applications

## 🌟 Impact & Accessibility

ASL Live Subtitles represents more than just a technical achievement—it's a step toward true digital inclusion. By providing accurate, real-time translation of ASL into text, we enable:

- **Educational Accessibility**: Students can participate fully in lectures and discussions
- **Professional Integration**: ASL users can engage confidently in workplace meetings and presentations
- **Social Connection**: Seamless communication in social gatherings and public events
- **Media Consumption**: Real-time subtitles for video content and live streams
- **Emergency Communication**: Critical accessibility during emergency situations
