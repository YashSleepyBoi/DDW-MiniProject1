

const scanButton= document.getElementById('click')


scanButton.addEventListener("click", async () => {
    console.log("User clicked scan button");
  
    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("> Scan started");
        window.alert('YAY')
        ndef.addEventListener("readingerror", () => {
        console.log("Argh! Cannot read data from the NFC tag. Try another one?");
      });
  
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);
      });
    } catch (error) {
        window.alert('NAY')
        console.log("Argh! " + error);
    }
  });
  
  writeButton.addEventListener("click", async () => {
    console.log("User clicked write button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.write("Hello world!");
      console.log("> Message written");
    } catch (error) {
      console.log("Argh! " + error);
    }
  });
  
  makeReadOnlyButton.addEventListener("click", async () => {
    log("User clicked make read-only button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.makeReadOnly();
      console.log("> NFC tag has been made permanently read-only");
    } catch (error) {
      console.log("Argh! " + error);
    }
  });