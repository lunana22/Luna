# Entity Relationship Diagram (ERD)

## Overview

This document describes the data model for the Luna application, designed for **PostgreSQL with JSONB** for flexibility and performance.

### Key Design Decisions

1.  **JSON Metadata**: `FolderMetadata` and `DeckMetadata` are stored in a single `metadata` JSONB column within the `FileNode` table to avoid expensive JOINs during tree traversal.
2.  **JSON Content**: `StudyItem` content (Word vs Card) is stored in a `content` JSONB column.
3.  **Seconds Precision**: Study time is tracked in seconds (`totalStudyTimeSeconds`) for accurate micro-learning tracking.
4.  **Session Logging**: `StudySessionLog` tracks user dwell time and activity type in specific nodes.

```mermaid
erDiagram
    %% 1. 사용자
    User {
        string id PK
        string email
        string nickname
        string profileImage
        string provider "GOOGLE | KAKAO"
        datetime createdAt
        datetime updatedAt
    }

    %% 2. 파일 시스템 (통합 테이블) ⭐
    FileNode {
        string id PK
        string ownerId FK
        string parentId FK "Folder Structure"
        string type "FOLDER | DECK"
        string name
        string description
        string emoji

        %% ⭐ 메타데이터는 JSON으로 통합!
        %% Folder: { sortOrder: 'NAME', color: '#FF0000' }
        %% Deck: { sourceLang: 'EN', targetLang: 'KO', tags: [] }
        json metadata

        boolean isPublic
        number forkCount
        number viewCount
        string originalNodeId FK "Fork Origin"
        datetime createdAt
        datetime updatedAt
    }

    %% 3. 학습 아이템 (통합 테이블) ⭐
    StudyItem {
        string id PK
        string nodeId FK
        string type "WORD | CARD"
        string status "UNKNOWN | MEMORIZED"

        %% ⭐ 내용물도 JSON으로 통합!
        %% Word: { termId: '...', customMeanings: {} }
        %% Card: { front: '...', back: '...' }
        json content

        string memo
        boolean isPinned
        number correctCount
        number wrongCount
        datetime nextReviewAt
        datetime lastStudiedAt
        datetime createdAt
        datetime updatedAt
    }

    %% 4. 사전 데이터 (참조용)
    DictionaryTerm {
        string id PK
        string word
        string language "EN | JA"
        string pronunciation
        string audioUrl
        string[] tags
    }

    DictionaryMeaning {
        string id PK
        string termId FK
        string meaning
        string language "KO"
        string exampleSentence
        string partOfSpeech "n | v | adj"
    }

    %% 5. 로그 시스템 (AI 분석용)
    %% 🟢 누락되었던 세션 로그 추가됨
    StudySessionLog {
        string id PK
        string userId FK
        string nodeId FK
        string activityType "VIEW | QUIZ | FOLDING"
        datetime startedAt
        datetime endedAt
        number durationSeconds
    }

    StudyLog {
        string id PK
        string userId FK
        string nodeId FK
        string studyItemId FK
        string result "CORRECT | WRONG | MEMORIZED"
        number reactionTimeMs
        datetime createdAt
    }

    DailyStudyStat {
        string id PK
        string userId FK
        string date "YYYY-MM-DD"
        number quizCount
        number correctCount
        number memorizedCount
        number totalStudyTimeSeconds "초 단위 수정됨"
    }

    %% 관계 정의
    User ||--o{ FileNode : "owns"
    FileNode ||--o{ FileNode : "parent/child"
    FileNode ||--o{ StudyItem : "contains"

    DictionaryTerm ||--o{ DictionaryMeaning : "has"

    %% 논리적 참조 (JSON 내부 값이라 FK 강제 안 함)
    StudyItem |o--o| DictionaryTerm : "content.termId -> Term.id"

    User ||--o{ StudySessionLog : "records session"
    User ||--o{ StudyLog : "records action"
    User ||--o{ DailyStudyStat : "daily stats"
```
