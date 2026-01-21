# Remplace l'url de prod par l'url locale

```bash
#!/bin/sh

LOCAL=your-website.com # WARNING !! without "local."
PROD=your-website-but-in-production.com # WARNING !! without "www."

yellow='\033[0;33m'
blue='\033[0;34m'
no_color='\033[0m'

if [ "$1" == "live" ]
then
    MODE_STR="MODE Live run"
    COLOR=$yellow
    QUESTION=no
    echo -e "${COLOR}"
else
    MODE=--dry-run
    MODE_STR="MODE TEST (Dry run)"
    COLOR=$blue
    QUESTION=yes

    echo -e "${COLOR}"
    echo -e "Lancement du Search and Replace DB en Mode TEST (Dry Run) dans 5 secondes..."
    sleep 5
fi

echo ""
echo -e "========================================================================================================="
echo "Remplacement de l'email d'admin par : admin@example.com"
vendor/bin/wp.bat option update admin_email admin@example.com
echo -e "========================================================================================================="

echo ""
echo -e "========================================================================================================="
echo '   [WP Search Replace] '$MODE_STR' - Replace : https://www.'$PROD' => http://local.'$LOCAL
echo -e "=========================================================================================================${no_color}"
vendor/bin/wp.bat search-replace https://www.$PROD http://local.$LOCAL --all-tables $MODE

echo ""
echo -e "${COLOR}========================================================================================================="
echo '   [WP Search Replace] '$MODE_STR' - Replace : http://www.'$PROD' => http://local.'$LOCAL
echo -e "=========================================================================================================${no_color}"
vendor/bin/wp.bat search-replace http://www.$PROD http://local.$LOCAL --all-tables $MODE

echo ""
echo -e "${COLOR}========================================================================================================="
echo '   [WP Search Replace] '$MODE_STR' - Replace : https://'$PROD ' => http://local.'$LOCAL
echo -e "=========================================================================================================${no_color}"
vendor/bin/wp.bat search-replace https://$PROD http://local.$LOCAL --all-tables $MODE

echo ""
echo -e "${COLOR}========================================================================================================="
echo '   [WP Search Replace] '$MODE_STR' - Replace : http://'$PROD ' => http://local.'$LOCAL
echo -e "=========================================================================================================${no_color}"
vendor/bin/wp.bat search-replace http://$PROD http://local.$LOCAL --all-tables $MODE

echo ""
echo -e "${COLOR}========================================================================================================="
echo '   [WP Search Replace] '$MODE_STR' - Replace : //www.'$PROD ' => //local.'$LOCAL
echo -e "=========================================================================================================${no_color}"
vendor/bin/wp.bat search-replace //www.$PROD //local.$LOCAL --all-tables $MODE

if [ "$QUESTION" == "yes" ]
then
    while true; do
        echo -e "${blue}Voici au dessus le résultat du test (Dry Run).${yellow}"
        read -p "Voulez-vous poursuivre vers le Live run ? Cette action est irréversible ! (yes/no) " yn
        echo -e "${no_color}"
        case $yn in
            yes ) echo -e "${yellow}Ok, c'est parti ! Lancement du Search and Replace DB en Live Run dans 5 secondes...${no_color}"; sleep 5; npm run wp:dbreplace -- live
                break;;
            no ) echo exiting...;
                exit;;
            * ) echo invalid response;
        esac
    done
    echo -e "${yellow}[WP Search Replace] Finish${no_color}"
fi

```

