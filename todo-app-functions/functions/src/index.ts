import { cloudEvent, CloudEvent } from '@google-cloud/functions-framework';
import { handleCelebration } from './utils/pushbanner.js';

// gcloudコマンドの --entry-point で指定する名前と一致させます
cloudEvent('onTaskUpdated', (event: CloudEvent<any>) => {
    handleCelebration(event);
});
