---
id: beverage_ordering_workflow
name: 飲料訂購流程
version: 1.0.0
author: Manus AI
description: 描述顧客從點餐到訂單完成的標準作業流程。
start_node: greet_customer
end_node: order_completed
---

# Workflow: 飲料訂購流程 (`beverage_ordering_workflow`)

## 流程概述 (Workflow Overview)

此工作流定義了顧客在飲料店進行點餐的完整流程，從 Agent 迎接顧客開始，到最終訂單完成並傳送至廚房。它包含了與顧客互動、處理訂單細節、計算金額及確認訂單等關鍵步驟。

## 流程圖 (Flow Diagram)

```mermaid
graph TD
    A[開始: 顧客進店] --> B{Agent: 詢問點餐}
    B --> C{顧客: 選擇品項}
    C --> D{Agent: 確認甜度冰塊加料}
    D -- 觸發熱飲珍珠規則 --> E[Agent: 提示規則並建議]
    E --> D
    D --> F{Agent: 檢查庫存}
    F -- 庫存不足 --> G[Agent: 提示庫存不足並建議]
    G --> D
    F --> H{Agent: 計算金額}
    H --> I{Agent: 告知金額並確認訂單}
    I -- 顧客確認 --> J[Agent: 傳送訂單至廚房]
    J --> K[結束: 訂單完成]
