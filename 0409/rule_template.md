---
id: hot_drink_pearl_rule
name: 熱飲不可加珍珠規則
version: 1.0.0
author: Manus AI
description: 規定熱飲品項不能添加珍珠，以確保飲品品質。
category: Order Restriction
severity: High
---

# Rule: 熱飲不可加珍珠 (`hot_drink_pearl_rule`)

## 規則描述 (Rule Description)

此規則旨在確保飲料品質與顧客體驗。由於珍珠在熱飲中容易變軟，影響口感，因此系統規定所有熱飲品項均不可添加珍珠。

## 觸發條件 (Trigger Conditions)

當顧客點選的飲料滿足以下兩個條件時觸發此規則：

1.  飲料的溫度屬性為「熱飲」。
2.  顧客要求添加的配料包含「珍珠」。

## 執行動作 (Action on Trigger)

1.  **拒絕加料**: 系統自動阻止將珍珠加入熱飲訂單。
2.  **提示 Agent**: Agent 應禮貌地告知顧客此限制，並建議其他可選配料。

## 範例 (Examples)

| 顧客點餐 | 規則判斷 | Agent 行為 |
| :--- | :--- | :--- |
| 「一杯熱珍珠奶茶」 | 觸發 | 「抱歉，熱飲不能加珍珠喔，請問您想換成其他配料嗎？」 |
| 「一杯冰珍珠奶茶」 | 不觸發 | 正常處理訂單 |

## 影響 (Impact)

*   **品質保證**: 維護飲品口感與品質。
*   **顧客滿意度**: 避免因口感不佳導致的客訴。

## 備註 (Notes)

此規則為硬性限制，Agent 無法繞過。若有特殊情況，需經由人工審核。