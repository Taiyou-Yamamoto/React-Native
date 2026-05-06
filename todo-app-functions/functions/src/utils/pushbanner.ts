export const handleCelebration = (event: any) => {
    // Firebase SDKがすでにBufferを綺麗なオブジェクトに解凍してくれています！
    const oldData = event.data?.before?.data();
    const newData = event.data?.after?.data();

    console.log(event.data);

    console.log('【DEBUG】oldDataの中身:', oldData);
    console.log('【DEBUG】newDataの中身:', newData);
    // データが存在しない場合は終了
    if (!oldData || !newData) return;

    const oldStatus = oldData.status;
    const newStatus = newData.status;

    console.log(`判定結果: [${oldStatus}] -> [${newStatus}]`);

    if (oldStatus === 'pending' && newStatus === 'done') {
        console.log('🎊 おめでとう！');
    }
};
