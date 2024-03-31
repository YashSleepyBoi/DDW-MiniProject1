
import java.util.concurrent.atomic.AtomicInteger;

public class SecondError {
    //public static int amount = 5000;
    public static AtomicInteger amount = new AtomicInteger(5000);

    public static void main(String args[]){
        int numberofThreads = 10000;
        Withdrawer[] threads = new Withdrawer[numberofThreads];

        for (int i = 0; i < numberofThreads; i++) {
            threads[i] = new Withdrawer();
            threads[i].start();
        }

        int totalWithdraw = 0;

        try {
            for (int i = 0; i < numberofThreads; i++) {
                threads[i].join();
                totalWithdraw += threads[i].getResult();
            }
        } catch (InterruptedException e) {
            System.out.println("some thread is not finished");
        }

        System.out.print("The result is ... ");
        System.out.print("wait for it ... ");
        System.out.println(totalWithdraw);
    }
}

class Withdrawer extends Thread {
    int whatIGot = 0;

    public void run () {
        //T1; T2; amount = 1000
        if (SecondError.amount.get() >= 1000) {
            //T1(amount = 1000)
            //T2(amount = 1000)

            System.out.println("I am doing something.");
            //T1, T2...
            SecondError.amount.set(SecondError.amount.get()-1000);
            //T2: amt -> 0;
            //T1: amt -> -1000;

            whatIGot = 1000;
        }
    }

    public int getResult() {
        return whatIGot;
    }
}

