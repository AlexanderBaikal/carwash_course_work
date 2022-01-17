export default function (url, options, timeout = 7000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Timeout. Server not respond during ${timeout / 1000} seconds`,
            ),
          ),
        timeout,
      ),
    ),
  ]);
}
