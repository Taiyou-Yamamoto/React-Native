import { CloudEvent } from '@google-cloud/functions-framework';

export const handleCelebration = (event: CloudEvent<any>) => {
    const data = event.data;
    if (!data) return;

    const oldStatus = data.oldValue?.fields?.status?.stringValue;
    const newStatus = data.value?.fields?.status?.stringValue;

    if (oldStatus === 'pending' && newStatus === 'done') {
        const memo = data.value?.fields?.memo?.stringValue || 'タスク';

        console.log(`🎊 おめでとう！「${memo}」を完了しましたね！`);

        // TODO: ここにPush通知や外部API（Slack等）への連携ロジックを追加可能
    }
};
