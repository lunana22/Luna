// packages/types/src/dictionary.ts
import { BaseEntity, ID, Language } from "../../utility/common";

/**
 * 품사 타입 정의 (주로 쓰이는 약어 사용 추천)
 */
export enum PartOfSpeech {
  /**
   * Noun (명사)
   */
  NOUN = "n",
  /**
   * Verb (동사)
   */
  VERB = "v",
  /**
   * Adjective (형용사)
   */
  ADJECTIVE = "adj",
  /**
   * Adverb (부사)
   */
  ADVERB = "adv",
  /**
   * Conjunction (접속사)
   */
  CONJUNCTION = "conj",
  /**
   * Preposition (전치사)
   */
  PREPOSITION = "prep",
  /**
   * Pronoun (대명사)
   */
  PRONOUN = "pron",
  /**
   * Interjection (감탄사)
   */
  INTERJECTION = "int",
  /**
   * Phrase (숙어/관용구)
   */
  PHRASE = "phrase",
}
/**
 * DictionaryTerm (질문 / 단어 본체)
 * - 세상에 존재하는 단어의 유니크한 정의
 * - 예: "Apple" (EN)
 */
export interface DictionaryTerm extends BaseEntity {
  /**
   * 단어 철자 (인덱스 검색용)
   */
  word: string;

  /**
   * 이 단어의 언어 (Source Language)
   * 예: Apple -> EN
   */
  language: Language;

  /**
   * 발음 기호 (예: [æp.l])
   */
  pronunciation?: string;

  /**
   * 듣기 파일 URL (TTS)
   */
  audioUrl?: string;
  /**
   * ⚡ [수정] 프론트엔드 편의성을 위해 포함시킴
   * DB에서는 별도 테이블이지만, API 응답에선 보통 Join해서 내려주므로 여기에 선언
   */
  meanings?: DictionaryMeaning[];

  /**
   * 태그 (예: ['토익', '중학영단어'])
   */
  tags?: string[];
}

/**
 * DictionaryMeaning (정답 / 번역된 뜻)
 * - 하나의 Term에 여러 언어의 뜻이 매달림 (1:N)
 * - 예: Term(Apple) -> Meaning(사과, KO)
 */
export interface DictionaryMeaning extends BaseEntity {
  /**
   * 어떤 단어(Term)의 뜻인지 연결 (FK)
   */
  termId: ID;
  /**
   * 번역된 뜻
   * 예: "사과"
   */
  meaning: string;

  /**
   * 이 뜻의 언어 (Target Language)
   * 예: KO
   */
  language: Language;

  /**
   * 예문 (뜻에 따라 예문이 달라질 수 있으므로 여기에 위치)
   */
  exampleSentence?: string;

  /**
   * 품사
   */
  partOfSpeech: PartOfSpeech;
}
