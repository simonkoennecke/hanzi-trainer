const WritingModeDescriptions = () => (
  <div className="text-sm text-gray-500 my-4">
    <p>
      <strong>Practice:</strong> The character is displayed, and you are
      prompted to draw it. This mode provides guidance and is ideal for
      familiarization and warm-up.
    </p>
    <p>
      <strong>Train:</strong> You must draw each stroke in the correct
      order. If a mistake is made, you can try again. After three
      incorrect attempts, a hint will be provided to assist you. This
      mode helps reinforce stroke order and accuracy.
    </p>
    <p>
      <strong>Write:</strong> You are asked to write the character
      independently, without any hints or guidance. After completion,
      your result is shown and evaluated, with emphasis on correct
      stroke order. This mode is designed for testing your mastery.
    </p>
  </div>
);

export default WritingModeDescriptions;
