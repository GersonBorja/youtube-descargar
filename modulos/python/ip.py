import urllib2
def public_ip():
	
	lista = "0123456789."
	ip=""
	dato=urllib2.urlopen("http://checkip.dyndns.org").read()

	for x in str(dato):

		if x in lista:
			ip += x
			
	return ip

print(public_ip())