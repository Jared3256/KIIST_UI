
const playNotificationSound = (sound) => {
  const playNot = new Audio(`/sound/${sound}.mp3`);

  playNot.play().catch(() => {});
};

export default playNotificationSound;
