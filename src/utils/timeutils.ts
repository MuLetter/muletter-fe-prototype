const timeutils = {
  msToString(ms: string | number) {
    if (typeof ms === "string") ms = parseInt(ms);

    let hour = Math.floor(ms / 1000 / 60);
    let minute: string | number = Math.floor((ms / 1000) % 60);

    if (minute < 10) minute = "0" + minute;

    return `${hour}:${minute}`;
  },
};

export default timeutils;
