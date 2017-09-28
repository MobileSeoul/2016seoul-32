//
//  ViewController.swift
//  RanLee
//
//  Created by yenos on 2016. 10. 28..
//  Copyright © 2016년 yenos. All rights reserved.
//

import UIKit

class ViewController: UIViewController,UIWebViewDelegate {
    @IBOutlet weak var btnHome: UIButton!

    @IBOutlet weak var webVieww: UIWebView!
    @IBOutlet weak var indicator: UIActivityIndicatorView!
    override func viewDidLoad() {
        super.viewDidLoad()
        indicator.startAnimating()
        
        let url = NSURL (string: "http://goyaaaaaaaa.xyz:50000")
        let requestObj = NSURLRequest(URL: url!);
        webVieww.delegate = self
        webVieww.loadRequest(requestObj)

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    @IBAction func btnHome(sender: AnyObject) {
        let url = NSURL (string: "http://goyaaaaaaaa.xyz:50000")
        let requestObj = NSURLRequest(URL: url!);
        webVieww.loadRequest(requestObj)

        
    }
    func webViewDidStartLoad(webView: UIWebView) {
        print("wbdidstart")
        
    }
    func webViewDidFinishLoad(webView: UIWebView) {
        print("finist")
        indicator.stopAnimating()
        indicator.hidden = true
    }
}

