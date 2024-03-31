public class Visibility extends Thread {
    boolean keepRunning = true;
    static Object lock = new Object();

    public static void main(String[] args)
            throws InterruptedException {//T1
        Visibility t = new Visibility();
        t.start();
        Thread.sleep(1000);
        synchronized (lock) {
            t.keepRunning = false;
        }
        System.out.println(System.currentTimeMillis()
                + ": keepRunning is false");
    }

    public void run() {//T2
        while (keepRunning) {
            synchronized (lock) {
             System.nanoTime();
            }
        }
    }
}