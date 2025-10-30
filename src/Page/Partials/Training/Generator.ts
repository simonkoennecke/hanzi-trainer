import { type Dictionary, type TrainingSet } from "../../../Context";
import type { TrainingInstance, TrainingType } from ".";

function GenerateTrainingSet(
  dictionary: Dictionary,
  trainingSet: TrainingSet,
  setSize: number
): TrainingInstance[] {
  // Generate training instances based on the training set entries. Pick random entries from trainingSet.
  const instances: TrainingInstance[] = [];
  const usedIndices = new Set<number>();
  const entries = trainingSet.entries;
  const totalEntries = entries.length;

  while (instances.length < setSize && usedIndices.size < totalEntries) {
    const randomIndex = Math.floor(Math.random() * totalEntries);
    if (usedIndices.has(randomIndex)) continue;
    usedIndices.add(randomIndex);

    const char = entries[randomIndex];
    const questionEntry = dictionary[char];
    if (!questionEntry) continue;

    const trainingTypes: TrainingType[] = [
      "char_to_meaning",
      "meaning_to_char",
      "char_to_pinyin",
      "pinyin_to_char",
      "speak",
      "writing",
    ];
    const pickType = Math.floor(Math.random() * trainingTypes.length);
    const randomType = trainingTypes[pickType];
    const answerEntries: (typeof questionEntry)[] = [];
    // speaking and writing does not require multiple choice answers
    if (!(randomType === "speak" || randomType === "writing")) {
      // Select random answers from the dictionary excluding the question entry
      const dictKeys = Object.keys(dictionary).filter((k) => k !== char);
      while (answerEntries.length < 3 && dictKeys.length > 0) {
        const answerIndex = Math.floor(Math.random() * dictKeys.length);
        const answerChar = dictKeys.splice(answerIndex, 1)[0];
        const answerEntry = dictionary[answerChar];
        if (answerEntry) {
          answerEntries.push(answerEntry);
        }
      }
      if (answerEntries.length < 3) continue; // Ensure we have enough answers
    }

    instances.push({
      type: randomType,
      question: questionEntry,
      answers: answerEntries,
    });
  }
  return instances;
}

export default GenerateTrainingSet;
